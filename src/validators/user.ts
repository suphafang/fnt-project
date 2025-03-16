import { t } from "elysia";
import { ROLE } from "../constants/role";

export const setupRoleBody = t.Object({
  role: t.Enum(ROLE, {examples: Object.values(ROLE)})
})

export const setupRoleResponse = t.Object({
  message: t.String({ examples: ['Role setup successfully'] }),
  role: t.Enum(ROLE, {examples: Object.values(ROLE)})
})
