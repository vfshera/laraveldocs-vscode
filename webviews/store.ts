import { writable } from "svelte/store";
import type { IDoc } from "./types";

export const docStore: any = writable([]);
