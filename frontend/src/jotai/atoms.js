import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userDataAtomStorage = atomWithStorage("userData", null);