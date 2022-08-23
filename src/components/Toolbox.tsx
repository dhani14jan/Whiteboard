
const Toolbox = ({ children, className }: any) => {
  return (
      <div className={className} style={{
          position: "absolute",
          zIndex: 999,
          display: "flex",
          justifyContent: "space-evenly",
          width: "400px",
          left: "50%",
          transform: "translateX(-50%) translateY(-100%)",
          background: "#DDD",
          borderRadius: "0.8rem",
          padding: "2rem"
      }}>
        {children}
    </div>
  )
}

export default Toolbox