import { UserType } from "@/database/user.model";
import fetchHandler from "./fetchHandler";
import { email } from "zod";
import { AccountType } from "@/database/account.model";

const API_URL = "http://localhost:3000/api";

export const api = {
  users: {
    getAll: () => fetchHandler(`${API_URL}/users`),
    create: (data: UserType) =>
      fetchHandler(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getById: (id: string) => fetchHandler(`${API_URL}/users/${id}`),
    update: (id: string, data: Partial<UserType>) =>
      fetchHandler(`${API_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_URL}/users/${id}`, {
        method: "DELETE",
      }),
    getByEmail: (email: string) =>
      fetchHandler(`${API_URL}/users/email/`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    register: (data: UserType) =>
      fetchHandler(`${API_URL}/users/register`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { username: string; password: string }) =>
      fetchHandler(`${API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  accounts: {
    getAll: () => fetchHandler(`${API_URL}/accounts`),
    create: (data: AccountType) =>
      fetchHandler(`${API_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getById: (id: string) => fetchHandler(`${API_URL}/accounts/${id}`),
    update: (id: string, data: Partial<AccountType>) =>
      fetchHandler(`${API_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_URL}/accounts/${id}`, {
        method: "DELETE",
      }),
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_URL}/accounts/provider/`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
  },
  api: {
    oauthSignin: ({
      provider,
      providerAccountId,
      user,
    }: {
      provider: string;
      providerAccountId: string;
      user: UserType;
    }) =>
      fetchHandler(`${API_URL}/auth/signin-with-oauth`, {
        method: "POST",
        body: JSON.stringify({ provider, providerAccountId, user }),
      }),
  },
};
