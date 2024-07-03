import Cookies from "js-cookie";

import { ITokens } from "@/src/types/interface/user.interface";
import { IAuthResponse } from "@/src/store/user/user.interface";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.access);
  Cookies.set("refreshToken", data.refresh);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveToStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const removeTokensStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getTokenStorage = () => {
  return Cookies.get("accessToken");
};
