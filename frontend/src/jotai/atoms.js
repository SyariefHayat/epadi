import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userDataAtomStorage = atomWithStorage("userData", null);

// export const allFarmersAtom = atom([]);
// export const allDistributorsAtom = atom([]);
// export const allInvestorsAtom = atom([]);
// export const allBuyersAtom = atom([]);