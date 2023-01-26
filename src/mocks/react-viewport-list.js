export const MockViewportList = ({ items, children }) => {
  return (
    <>
      <div />
      {items.map(children)}
      <div />
    </>
  );
};

export default MockViewportList;
