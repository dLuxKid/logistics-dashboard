import LatestShipping from "./components/latest-shipping";
import LineChartData from "./components/line-chart";
import Navbar from "./components/navbar";
import OrderRequest from "./components/order-request";
import TruckLoadingPieChart from "./components/pie-chart";

function App() {
  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <div className="py-4 px-[5%] bg-slate-400/10 min-h-screen flex justify-center">
        <div className="flex gap-4 flex-col lg:flex-row w-full max-w-[1512px]">
          <div className="w-full lg:w-[70%] flex flex-col gap-4">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <LineChartData />
              <TruckLoadingPieChart />
            </div>
            <LatestShipping />
          </div>
          <div className="w-full lg:w-[30%]">
            <OrderRequest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
