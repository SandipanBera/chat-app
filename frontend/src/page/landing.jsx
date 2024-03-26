import { TypeAnimation } from "react-type-animation";
import Container from "../components/container/container";
function Landing() {
  return (
    <Container className="flex absolute top-1/2 justify-center max-h-fit">
      <div className="flex flex-col w-full">
        <div className="p-0">
          <span className="font-bold lg:text-5xl sm:text-4xl text-2xl">
            Welcome to
          </span>
          &nbsp;
          <TypeAnimation
            sequence={["Konnekt", 2000, "", 2000]}
            wrapper="span"
            speed={40}
            style={{
              fontSize: "50px",
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
          style={{
            fontSize: "15px",
            display: "inline-block",
            color: "#B65693",
          }}
          repeat={Infinity}
        />
      </div>
    </Container>
  );
}

export default Landing;
