import ColorDropper from "./components/ColorDropper";

import "./App.css";
import { Provider } from "react-redux";
import { store } from "./stores";

const App = () => {
	return (
		<Provider store={store}>
			<ColorDropper />
		</Provider>
	);
};

export default App;
