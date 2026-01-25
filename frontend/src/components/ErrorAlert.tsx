import { FiRefreshCcw } from "react-icons/fi";
import { TbFaceIdError } from "react-icons/tb";

type ErrorStateProps = {
  title?: string;
  message?: string;
  refetch?: () => Promise<unknown> | void;
  isFetching?: boolean;
  retry?: boolean
};

export function ErrorAlert({
  title = "Something went wrong",
  message = "We couldn’t load this data. Please try again.",
  refetch,
  isFetching,
  retry
}: ErrorStateProps) {


  return (
    <div className="grid place-content-center min-h-75 px-4 mx-auto">
      <div className="max-w-sm w-full rounded-2xl border border-white/10  dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg p-8 text-center space-y-5">

        <div className="mx-auto w-fit rounded-full bg-red-100 dark:bg-red-900/30 p-4">
          <TbFaceIdError className="text-4xl text-red-500" />
        </div>

        <div className="space-y-1 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
        {retry && <button onClick={refetch}
          className="
              inline-flex items-center justify-center gap-2
              rounded-lg px-5 py-2.5 text-sm font-medium
              cursor-pointer
            bg-white text-zinc-900
              hover:scale-[1.02] active:scale-[0.98]
              transition-all
            "
        >
          <FiRefreshCcw
            className={`transition-transform ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Retrying…" : "Try again"}
        </button>
        }
      </div>
    </div>
  );
}