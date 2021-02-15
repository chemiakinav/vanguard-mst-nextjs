import "../styles/global.css";
import { useStore } from "../stores/RootStore";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState);
  return <Component store={store} {...pageProps} />;
}
