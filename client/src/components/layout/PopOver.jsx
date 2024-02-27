// eslint-disable-next-line react/prop-types
function PopOver({ children }) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default PopOver;
