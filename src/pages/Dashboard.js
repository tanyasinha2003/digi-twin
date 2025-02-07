import { Link } from "react-router-dom";
import { useState } from 'react';
import Navbar from "../components/navbar";
import battery from "../assets/images/battery.png";
import temp from "../assets/images/temp.png";
import pin from "../assets/images/pin.png";
import tyre from "../assets/images/tyre.png";
import level from "../assets/images/level.png";
import car from "../assets/images/car.png";
import red from "../assets/images/red.png";
import yellow from "../assets/images/yellow.png";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Model(props) {
  const { scene } = useGLTF("/car.glb");
  return <primitive object={scene} {...props} />;
}

const ProgressBar = ({ progress, color }) => {
  return (
    <div className="w-[10rem] bg-gray-300 rounded-full h-3">
      <div
        className={` h-3 rounded-full`}
        style={{ width: `${progress}%`, backgroundColor: `#${color}` }}
      ></div>
    </div>
  );
};

const EngineOilLevel = () => (
  <div className="h-[10rem] bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <p>Engine Oil Level</p>
    <p className="text-[2rem]">
      93<span className="text-[1rem]">%</span>
    </p>
    <ProgressBar progress={93} color="39d469" />
  </div>
);

const CabinTemperature = () => (
  <div className="relative h-[10rem] overflow-hidden bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <p>Cabin Temperature</p>
    <p className="text-[2rem] relative z-10 mt-[1rem]">
      28<span className="text-[1rem]">°C</span>
    </p>
    <div
      className="absolute top-[4rem]  h-[10rem]  w-full bg-cover bg-center rounded-md shadow-md mt-auto"
      style={{ backgroundImage: `url(${temp})`, backgroundSize: "130%" }}
    ></div>
  </div>
);

const CoolantLevel = () => (
  <div className="bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <p className="mt-[2rem]">Coolant Level</p>
    <p className="text-[2rem] ">
      41<span className="text-[1rem]">%</span>
    </p>
    <div
      className="relative h-[5rem] w-full bg-cover bg-center rounded-md shadow-md mt-auto"
      style={{ backgroundImage: `url(${level})`, backgroundSize: "140%" }}
    ></div>
  </div>
);

const BrakeFluidPressure = ({ data, options, pin }) => (
  <div className="bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <p className="mt-[1rem]">Brake Fluid Pressure</p>
    <p className="text-[1.5rem] z-10 absolute top-[2.5rem] left-[5.5rem]">
      92<span className="text-[1rem]">%</span>
    </p>
    <div className="relative w-[10rem] h-[10rem]">
      <Doughnut data={data} options={options} />
      <span className="absolute bottom-[0.8rem] left-0">0</span>
      <span className="absolute bottom-[0.8rem] -right-2">100</span>
      <img
        src={pin}
        alt="pin"
        className="absolute bottom-[1rem] left-[4rem] w-[4rem] rotate-[70deg]"
      />
    </div>
  </div>
);

const DiscWear = () => (
  <div className="bg-[#ececec] h-[10rem] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <p>Disc Wear</p>
    <p className="text-[2rem]">
      61<span className="text-[1rem]">%</span>
    </p>
    <ProgressBar progress={61} color="FFBF61" />
  </div>
);

const BatteryStatus = ({ battery }) => (
  <div className="h-[10rem] relative bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <img
      src={battery}
      alt="battery"
      className="h-[10rem] absolute -top-[0.5rem]"
    />
    <p className="text-[2rem] z-10 absolute top-[3rem]">
      96<span className="text-[1rem]">%</span>
    </p>
    <p className="mt-[4.5rem]">Battery</p>
  </div>
);

const TyrePressure = ({ data, options, tyre }) => (
  <div className="col-span-2 h-[20rem] w-[26.5rem] relative bg-[#ececec] rounded-md shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <div className="flex flex-col relative mb-[1rem]">
      <img src={car} alt="car" className="w-[20rem] opacity-80" />
      <p className="absolute bottom-[6rem] left-[7rem]">Tyre Pressure</p>
    </div>

    {[...Array(4)].map((_, i) => {
      const usedPressure = data[i].datasets[0].data[0]; // First value from data array
      return (
        <div
          key={i}
          className={`absolute ${i < 2 ? "top-0" : "bottom-0"} ${
            i % 2 === 0 ? "left-0" : "right-0"
          } m-[1rem] w-[8rem] h-[8rem]`}
        >
          <Doughnut data={data[i]} options={options} />
          <img src={tyre} alt="tyre" className="absolute top-0 w-[10rem]" />
          <p className="text-[1.5rem] z-10 absolute top-[3rem] left-[3rem]">
            {usedPressure}
            <span className="text-[1rem]">%</span>
          </p>
        </div>
      );
    })}
  </div>
);

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const data = {
    labels: ["Used Pressure", "Available Pressure"],
    datasets: [
      {
        data: [92, 8], // 70% used, 30% available
        backgroundColor: ["#39d469", "#E0E0E0"], // Colors for each segment
        hoverBackgroundColor: ["#2ba83d", "#B3B3B3"], // Hover colors
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%", // Creates the donut effect
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const tyre1 = {
    labels: ["Used Pressure", "Available Pressure"],
    datasets: [
      {
        data: [30, 70], // 70% used, 30% available
        backgroundColor: ["#FF3131", "#E0E0E0"], // Colors for each segment
        hoverBackgroundColor: ["#2ba83d", "#B3B3B3"], // Hover colors
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%", // Creates the donut effect
      },
    ],
  };
  const tyre2 = {
    labels: ["Used Pressure", "Available Pressure"],
    datasets: [
      {
        data: [90, 10], // 70% used, 30% available
        backgroundColor: ["#39d469", "#E0E0E0"], // Colors for each segment
        hoverBackgroundColor: ["#2ba83d", "#B3B3B3"], // Hover colors
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%", // Creates the donut effect
      },
    ],
  };
  const tyre3 = {
    labels: ["Used Pressure", "Available Pressure"],
    datasets: [
      {
        data: [50, 50], // 70% used, 30% available
        backgroundColor: ["#FFBF61", "#E0E0E0"], // Colors for each segment
        hoverBackgroundColor: ["#2ba83d", "#B3B3B3"], // Hover colors
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%", // Creates the donut effect
      },
    ],
  };
  const tyre4 = {
    labels: ["Used Pressure", "Available Pressure"],
    datasets: [
      {
        data: [80, 20], // 70% used, 30% available
        backgroundColor: ["#39d469", "#E0E0E0"], // Colors for each segment
        hoverBackgroundColor: ["#2ba83d", "#B3B3B3"], // Hover colors
        borderWidth: 0,
        borderRadius: 20,
        cutout: "85%", // Creates the donut effect
      },
    ],
  };

  const tyreData = [tyre1, tyre2, tyre3, tyre4];

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    maintainAspectRatio: false, // Ensures chart scales correctly
  };

  const handleClick = (component) => {
    let customMessage = '';
    
    switch(component) {
      case 'EngineOilLevel':
        customMessage = 'Engine Oil Level is at optimal status.';
        break;
      case 'CabinTemperature':
        customMessage = 'Cabin temperature is in a comfortable range.';
        break;
      case 'CoolantLevel':
        customMessage = 'Coolant Level is sufficient.';
        break;
      case 'BrakeFluidPressure':
        customMessage = 'Brake Fluid Pressure is stable.';
        break;
      case 'DiscWear':
        customMessage = 'Disc Wear is within acceptable limits.';
        break;
      case 'BatteryStatus':
        customMessage = 'Battery Status is good.';
        break;
      case 'TyrePressure':
        customMessage = 'Tyre Pressure is optimal.';
        break;
      default:
        customMessage = 'Click on any component for more info.';
    }

    setMessage(customMessage);
    setShowMessage(true); // Show message when a component is clicked
  };

    // Function to close the message
    const closeMessage = () => {
      setShowMessage(false); // Hide the message
    };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#222831] ">
      <Navbar />
      <div className="w-[25rem] h-[15rem] bg-[#31363F] opacity-80 rounded-lg  absolute left-0 ml-[2rem] mt-[2.5rem] backdrop-blur-lg p-5"></div>
      <div className="absolute w-[25rem] h-[15rem] ml-[2rem] mt-[2.5rem] p-5 text-left">
        <h1 className=" text-white text-[3rem] ">Welcome</h1>
        <div className="bg-[#ffd8d8] py-1 px-1 rounded-md flex items-center ">
          <div className="w-[2rem] h-[2rem]">
            <img src={red} alt="yellow " />
          </div>
          Alert - Coolant Level Low
        </div>
        <div className="bg-[#ffd8d8] py-1 px-1 rounded-md flex items-center mt-2 ">
          <div className="w-[2rem] h-[2rem]">
            <img src={red} alt="yellow " />
          </div>
          Alert - Front Right Tyre Pressure Low
        </div>
        <div className="bg-[#fff2b6] py-1 px-1 rounded-md flex items-center mt-2">
          <div className="w-[2rem] h-[2rem]">
            <img src={yellow} alt="yellow " />
          </div>
          Warning - Cabin Slightly Warm
        </div>
      </div>

      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        gl={{ alpha: true }}
        style={{
          position: "absolute",
          width: "90vw",
          height: "90vh",
          background: "transparent",
        }}
      >
        {/* <color attach="background" args={["#101010"]} /> */}
        <PresentationControls
          speed={1.5}
          global
          zoom={0.3}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
      <div className="w-[30rem] h-[44rem] bg-[#31363F] opacity-80 rounded-lg z-10 absolute right-0 mr-[2rem] mt-[2.5rem] backdrop-blur-lg grid grid-cols-2 gap-4 p-5"></div>
      <div className="grid grid-cols-2 gap-4 p-5 absolute mr-[2rem] mt-[2.5rem] w-[30rem] h-[44rem] right-0 z-10 overflow-y-scroll scrollbar-track-[#31363F]">
        {/* <EngineOilLevel />
        <CabinTemperature />
        <CoolantLevel />
        <BrakeFluidPressure data={data} options={options} pin={pin} />
        <DiscWear />
        <BatteryStatus battery={battery} />
        <TyrePressure data={tyreData} options={options} tyre={tyre} /> */}
        <div onClick={() => handleClick("EngineOilLevel")}>
          <EngineOilLevel />
        </div>

        <div onClick={() => handleClick("CabinTemperature")}>
          <CabinTemperature />
        </div>

        <div onClick={() => handleClick("CoolantLevel")}>
          <CoolantLevel />
        </div>

        <div onClick={() => handleClick("BrakeFluidPressure")}>
          <BrakeFluidPressure data={data} options={options} pin={pin} />
        </div>

        <div onClick={() => handleClick("DiscWear")}>
          <DiscWear />
        </div>

        <div onClick={() => handleClick("BatteryStatus")}>
          <BatteryStatus battery={battery} />
        </div>

        <div onClick={() => handleClick("TyrePressure")}>
          <TyrePressure data={tyreData} options={options} tyre={tyre} />
        </div>
      </div>
      {/* {message && (
      <div className="absolute bg-[#31363F] opacity-80 text-white top-[18%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  px-4 py-2 rounded-md shadow-md z-20">
        <p>{message}</p>
      </div>
    )} */}
    {showMessage && (
        <div className="absolute bg-[#31363F] opacity-80 text-white top-[18%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-md shadow-md z-20">
          <div className="flex justify-between items-center">
            <p>{message}</p>
            <button
              onClick={closeMessage}
              className="text-xl font-bold text-red-500 hover:text-red-700 focus:outline-none ml-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
