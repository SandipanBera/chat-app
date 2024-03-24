import { TypeAnimation } from "react-type-animation";
function Landing() {
  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <span className="font-bold lg:text-6xl sm:text-4xl text-2xl ">
          Welcome to
        </span>
        &nbsp;
        <TypeAnimation
          sequence={["Konnekt", 2000, "", 2000]}
          wrapper="span"
          speed={30}
          style={{
            fontSize: "60px",
            display: "inline-block",
            color: "#B65693",
        
          }}
          repeat={Infinity}
        />
      </div>

      <TypeAnimation
        sequence={[
          "We konnekt pepole to pepole",
          2000,
          "Start your journey with konnekt",
          2000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "20px", display: "inline-block", color: "#B65693" }}
        repeat={Infinity}
      />
    </div>
  );
}

export default Landing;
