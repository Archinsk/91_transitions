import "./CardCustom.css";
export default function CardCustom({ classname, children, ...props }) {
  return (
    <div className="card-custom" {...props}>
      {children}
    </div>
  );
}
