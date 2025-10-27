import ky from "ky"

const apiUrl = "http://localhost:3333"

export const api = ky.create({
  prefixUrl: apiUrl,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ["get"],
  },
})
