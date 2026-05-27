import React from "react";

export default function DataRenderer<T>({
  success,
  data,
  errorMessage,
  render,
}: {
  success: boolean;
  data: T[];
  errorMessage?: string | undefined;
  render: (data: T[]) => React.ReactNode;
}) {
  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Oops! {errorMessage || "Something went wrong."}
        </h3>
      </div>
    );
  }
  // if (!data || !data?.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-12 px-4">
  //       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
  //         <svg
  //           className="w-8 h-8 text-red-600"
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  //           />
  //         </svg>
  //       </div>
  //       <h3 className="text-lg font-semibold text-white mb-2">
  //         No results found !!
  //       </h3>
  //       <p className="text-gray-600 text-center max-w-md">
  //         We can not find any data matching your criteria. Try adjusting your
  //         search or filters.
  //       </p>
  //     </div>
  //   );
  // }
  return <div>{render(data)}</div>;
}
