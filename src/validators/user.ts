import { t } from "elysia";
import { ROLE } from "../constants/role";

export const setupRoleBody = t.Object({
  role: t.Enum(ROLE, { examples: Object.values(ROLE) })
})

export const setupRoleResponse = t.Object({
  message: t.String({ examples: ['Role setup successfully'] }),
  role: t.Enum(ROLE, { examples: Object.values(ROLE) })
})

export const updateGeneralInformationBody = t.Object({
  firstName: t.String({ examples: ['John'] }),
  lastName: t.String({ examples: ['Doe'] }),
  email: t.String({ format: 'email', examples: ['example@email.com'] }),
  phone: t.String({ examples: ['0999999999'], minLength: 10, maxLength: 10 }),
  address: t.String({ examples: ['123 Main St'] }),
  province: t.String({ examples: ['Province'] }),
  district: t.String({ examples: ['District'] }),
  subdistrict: t.String({ examples: ['Subdistrict'] }),
  organicCertificateFiles: t.Optional(t.Files()),
  location: t.String({ examples: ['Location'] })
})

export const updateGeneralInformationResponse = t.Object({
  message: t.String({ examples: ['General information updated successfully'] }),
  data: t.Object({
    firstName: t.String({ examples: ['John'] }),
    lastName: t.String({ examples: ['Doe'] }),
    email: t.String({ format: 'email', examples: ['example@email.com'] }),
    phone: t.String({ examples: ['0999999999'], minLength: 10, maxLength: 10 }),
    address: t.String({ examples: ['123 Main St'] }),
    province: t.String({ examples: ['Province'] }),
    district: t.String({ examples: ['District'] }),
    subdistrict: t.String({ examples: ['Subdistrict'] }),
    organicCertificate: t.Array(t.Object({
      filename: t.String({ examples: ['certificate.pdf'] }),
      key: t.String({ examples: ['key'] })
    })),
    location: t.String({ examples: ['Location'] })
  })
})

export const getByIDResponse = t.Object({
  _id: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] }),
  fullName: t.String({ examples: ['John Doe'] }),
  email: t.String({ format: 'email', examples: ['example@email.com'] }),
  phone: t.String({ examples: ['0999999999'], minLength: 10, maxLength: 10 }),
  role: t.Nullable(t.Enum(ROLE, { examples: Object.values(ROLE) })),
  generalInformation: t.Optional(t.Object({
    firstName: t.String({ examples: ['John'] }),
    lastName: t.String({ examples: ['Doe'] }),
    email: t.String({ format: 'email', examples: ['example@email.com'] }),
    phone: t.String({ examples: ['0999999999'], minLength: 10, maxLength: 10 }),
    address: t.String({ examples: ['123 Main St'] }),
    province: t.String({ examples: ['Province'] }),
    district: t.String({ examples: ['District'] }),
    subdistrict: t.String({ examples: ['Subdistrict'] }),
    organicCertificate: t.Array(t.Object({
      _id: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] }),
      filename: t.String({ examples: ['certificate.pdf'] }),
      key: t.String({ examples: ['key'] })
    })),
    location: t.String({ examples: ['Location'] })
  }))
})
