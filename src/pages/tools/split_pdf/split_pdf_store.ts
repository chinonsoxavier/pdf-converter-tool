import { create } from "zustand";

interface IRanges {
  name: string;
  from: number;
  to: number;
}

interface SplitPdfStore {
  // selectedRange: string;
  splitMethod: string;
  Ranges: IRanges[];
  fixedRange: IRanges[];
  addRange: (arg0: IRanges) => void;
  setSplitMethod: (arg0: string) => void;
  initRange: (arg0: IRanges) => void;
  setFixedRange: (arg0: number,range:number) => void;
  // setSelectedRange: (arg0: string) => void;
  updateRange: (newRange: IRanges, name: string) => void;
  reOrderRange: (arg0: IRanges[]) => void;
}

const useSplitPdfStore = create<SplitPdfStore>((set) => ({
  fixedRange: [],
  Ranges: [{ name: "Range 1", from: 1, to: 1 }],
  // selectedRange: "custom",
  splitMethod: "Range",
  // setSelectedRange: (newRange: string) =>
  //   set(() => ({ selectedRange: newRange })),
  addRange: (newRange: IRanges) =>
    set((state) => ({ Ranges: [...state.Ranges, newRange] })),

  // setFixedRange: (numPages: number, range: number) =>
  //   set(() => {
  //     // Calculate max ranges: each range covers 2 pages (e.g., 1-2, 3-4)
  //      if (numPages <= 0 || range <= 0) {
  //        return { fixedRange: [] };
  //      }
  //     const maxRanges = Math.ceil(numPages / range);
  //     return {
  //       fixedRange:
  //         numPages > 0
  //           ? Array.from({ length: maxRanges }, (_, index) => ({
  //               name: `Range ${index + 1}`,
  //               from: range * index + 1, // 1, 3, 5, ...
  //               to:
  //                 range * (index + 1) < numPages
  //                   ? range * (index + 1)
  //                   : numPages, // 2, 4, 6, ...
  //             }))
  //           : [],
  //     };
  //   }),
  // setFixedRange: (numPages: number, rangeSize: number) =>
  //   set(() => {
  //     if (numPages <= 0 || rangeSize <= 0) {
  //       return { fixedRange: [] };
  //     }
  //     const maxRanges = Math.ceil(numPages / rangeSize);
  //     return  {
  //       fixedRange: rangeSize -1 *rangeSize < numPages && Array.from({ length: maxRanges }, (_, index) => {
  //         const from = index * rangeSize + 1;
  //         const to = from + rangeSize >= numPages ? numPages : Math.min(from + rangeSize - 1, numPages);
  //         // if (from + rangeSize <= numPages) {
  //           return {
  //             name: `Range ${index + 1}`,
  //             from,
  //             to,

  //           };
  //         // };
  //         // return ;
  //       // from + rangeSize <= numPages ?
  //       }),
  //     };
  //   }),
  setFixedRange: (numPages: number, rangeSize: number) =>
    set(() => {
      if (numPages <= 0 || rangeSize <= 0) {
        return { fixedRange: [] }; // Return empty array for invalid inputs
      }

      const maxRanges = Math.ceil(numPages / rangeSize);
      const fixedRange: IRanges[] = Array.from(
        { length: maxRanges },
        (_, index) => {
          const from = index * rangeSize + 1;
          const to = (from + rangeSize - 1);
          return {
            name: `Range ${index + 1}`,
            from,
            to,
          };
        }
      );

      return { fixedRange };
    }),
  updateRange: (newRange: IRanges, name: string) =>
    set((state) => ({
      Ranges: state.Ranges.map((range) =>
        range.name === name ? { ...range, ...newRange } : range
      ),
    })),
  setSplitMethod: (newMethod: string) =>
    set(() => ({ splitMethod: newMethod })),
  initRange: (newRange: IRanges) => set(() => ({ Ranges: [newRange] })),
  reOrderRange: (newOrder: IRanges[]) => set(() => ({ Ranges: newOrder })),
}));

export default useSplitPdfStore;
