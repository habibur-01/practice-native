import {memo, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  addMarketWatch,
  setCurrentPrice,
} from '../redux/features/price/priceSlice';

let prices = {};

const Pumping = () => {
  const dispatch = useDispatch();
  // const marketWatchThrottle = useThrottledCallback(dispatch, 1000);
  // const currentPriceThrottle = useThrottledCallback(dispatch, 1000);
  // const user = useSelector(state => state.auth.user);
  // socket variable
  const socketRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const isReconnecting = useRef(false);
  const maxReconnectAttempts = 100;
  const reconnectInterval = 2000;

  // ===========================================================================
  // Price pumping handler
  // ===========================================================================
  const pricePumpingHandler = pumpingData => {
    const {ask, bid, symbol, high, low, timestamp, direction, digits} =
      pumpingData || {};
    dispatch(setCurrentPrice({currency: symbol, data: {ask, bid, timestamp}}));
    // currentPriceThrottle(setCurrentPrice({ currency: symbol, data: { ask, bid, timestamp } }))
    // marketWatchThrottle(addMarketWatch({
    //     ask,
    //     bid,
    //     high,
    //     low,
    //     symbol,
    //     direction,
    //     digits,
    //     ask_type: prices && prices[symbol]?.last_ask_price > ask ? 1 : 0,
    //     bid_type: prices && prices[symbol]?.last_bid_price > bid ? 1 : 0,
    //     timestamp,
    // }))
    dispatch(
      addMarketWatch({
        ask,
        bid,
        high,
        low,
        symbol,
        direction,
        digits,
        ask_type: prices && prices[symbol]?.last_ask_price > ask ? 1 : 0,
        bid_type: prices && prices[symbol]?.last_bid_price > bid ? 1 : 0,
        timestamp,
      }),
    );
    prices[symbol] = {
      last_ask_price: ask,
      last_bid_price: bid,
    };
  };

  //==============================================================================
  // Pumping order add handler
  // =============================================================================
  // const pumpingOrderAddHandler = data => {
  //   if (data?.cmd === 0 || data?.cmd === 1) {
  //     dispatch(addOpenPosition(data));
  //   } else if (
  //     data?.cmd === 2 ||
  //     data?.cmd === 3 ||
  //     data?.cmd === 4 ||
  //     data?.cmd === 5
  //   ) {
  //     dispatch(addPendingOrder(data));
  //   }
  // };

  // =============================================================================
  // Pumping order update handler
  // =============================================================================
  // const pumpingOrderUpdateHandler = data => {
  //   if (data?.cmd === 0 || data?.cmd === 1) {
  //     dispatch(updateOpenPosition(data));
  //   } else if (
  //     data?.cmd === 2 ||
  //     data?.cmd === 3 ||
  //     data?.cmd === 4 ||
  //     data?.cmd === 5
  //   ) {
  //     dispatch(updatePendingOrder(data));
  //   }
  // };

  // =============================================================================
  // Pumping order close handler
  // =============================================================================
  // const pumpingOrderCloseHandler = data => {
  //   if (data?.cmd === 0 || data?.cmd === 1) {
  //     dispatch(removeOpenPosition(data));
  //   } else if (
  //     data?.cmd === 2 ||
  //     data?.cmd === 3 ||
  //     data?.cmd === 4 ||
  //     data?.cmd === 5
  //   ) {
  //     dispatch(removePendingOrder(data));
  //   } else if (data?.cmd === 6) {
  //     dispatch(addBalance(data.profit));
  //   } else if (data?.cmd === 7) {
  //     dispatch(addCredit(data.profit));
  //   }
  // };

  //==============================================================================
  // Connect socket
  // =============================================================================
  const connectSocket = () => {
    const server = process.env.SOCKET_STREAM_URL;
    if (!server) {
      console.error('Socket server not found!');
      return;
    }

    if (
      socketRef?.current &&
      socketRef?.current.readyState !== WebSocket.CLOSED
    ) {
      console.log('Socket already exists or is connecting.');
      return;
    }

    socketRef.current = new WebSocket(server);

    socketRef?.current.addEventListener('open', () => {
      reconnectAttemptsRef.current = 0;
      isReconnecting.current = false;
      // socketRef?.current.send(`USER|${user.login}`);
      console.log('Connected to  Server');
    });

    socketRef?.current.addEventListener('close', e => {
      console.log('Socket disconnected');
      reconnectSocket();
    });

    socketRef?.current.addEventListener('error', err => {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket',
      );
      socketRef.current.close();
    });

    socketRef?.current.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      if (data.event === 'price') {
        // console.log('price', data.data);
        pricePumpingHandler(data.data);
      } else if (data.event === 'order_add') {
        // pumpingOrderAddHandler(data.data);
      } else if (data.event === 'order_update') {
        // pumpingOrderUpdateHandler(data.data);
      } else if (data.event === 'order_delete') {
        // pumpingOrderCloseHandler(data.data);
      }
    });
  };

  // =============================================================================
  // Reconnect socket
  // =============================================================================
  const reconnectSocket = () => {
    if (isReconnecting.current) return;

    isReconnecting.current = true;

    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      setTimeout(() => {
        console.log(
          `Reconnecting... Attempt ${reconnectAttemptsRef.current + 1}`,
        );
        reconnectAttemptsRef.current += 1;
        connectSocket();
      }, reconnectInterval);
    } else {
      console.error(
        'Max reconnect attempts reached. Continuing to retry every 10 seconds.',
      );
      setTimeout(() => {
        reconnectAttemptsRef.current += 1; // Increment attempts for monitoring
        connectSocket();
      }, 10000); // Retry after a longer interval
    }
  };

  useEffect(() => {
    // if (user) {
    connectSocket();
    // }
    return () => {
      socketRef?.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intValId = setInterval(() => {
      if (
        socketRef?.current &&
        socketRef?.current.readyState === WebSocket.OPEN
      ) {
        // console.log('Ping sent');

        socketRef?.current.send('ping');
      }
    }, 15 * 1000);
    return () => clearInterval(intValId);
  }, []);

  return null;
};

export default memo(Pumping);
