/**
 *
 */

import { toNextJsHandler } from "better-auth/next-js"

import { auth } from "@osynco/auth"

export const { POST, GET } = toNextJsHandler(auth)
