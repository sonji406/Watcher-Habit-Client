const UnderlinedText = ({ color, children }) => (
  <p
    className={`mb-1 text-slate-200 font-semibold underline decoration-4 underline-offset-4 decoration-${color} ml-3`}
  >
    {children}
  </p>
);

export default UnderlinedText;
