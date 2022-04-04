const Button = ({ data, style }) => (
  <a className={"button " + style} href={data.link} target="_blank">
    <p>
      {data.canBeBought ? `Buy` : "Read"} for{" "}
      <span>{data.canBeBought ? data.listPrice : "free"}</span>
    </p>
  </a>
);
export default Button;