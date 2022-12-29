import { baseURL } from "../../config";

function Loading({ loading, statusLoading }) {
  return (
    loading && (
      <div className="fixed-loading">
        <div>
          <img
            className="settings"
            src={`${baseURL.replace("5000", "3000")}images/settings.gif`}
            alt=""
          />
          <h2 style={{ color: "#5c5a5c" }}>{statusLoading || "טוען"}...</h2>
        </div>
      </div>
    )
  );
}

export default Loading;
