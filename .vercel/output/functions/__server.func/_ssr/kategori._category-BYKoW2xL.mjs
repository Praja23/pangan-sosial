import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid place-items-center text-sm", children: [
  "Gagal memuat: ",
  error.message
] });
export {
  SplitErrorComponent as errorComponent
};
