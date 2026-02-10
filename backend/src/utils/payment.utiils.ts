import crypto from "crypto"
import axios from "axios"
import dns from "dns"

export const pfValidSignature = (
  pfData,
  pfParamString,
  pfPassphrase = null,
) => {
  // Calculate security signature
  let tempParamString = ""
  if (pfPassphrase !== null) {
    pfParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(/%20/g, "+")}`
  }

  const signature = crypto.createHash("md5").update(pfParamString).digest("hex")
  return pfData["signature"] === signature
}

export async function ipLookup(domain): Promise<[]> {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true }, (err, address, family) => {
      if (err) {
        reject(err)
      } else {
        const addressIps = address.map(function (item) {
          return item.address
        })
        resolve(addressIps)
      }
    })
  })
}

export const pfValidIP = async (req) => {
  const validHosts = [
    "www.payfast.co.za",
    "sandbox.payfast.co.za",
    "w1w.payfast.co.za",
    "w2w.payfast.co.za",
  ]

  let validIps = []
  const pfIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress

  try {
    for (let key in validHosts) {
      const ips = await ipLookup(validHosts[key])

      validIps = [...validIps, ...ips]
    }
  } catch (err) {
    console.error(err)
  }

  const uniqueIps = [...new Set(validIps)]

  if (uniqueIps.includes(pfIp)) {
    return true
  }
  return false
}

export const pfValidPaymentData = (cartTotal, pfData) => {
  return (
    Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount_gross"])) <= 0.01
  )
}

export const pfValidServerConfirmation = async (pfHost, pfParamString) => {
  const result = await axios
    .post(`https://${pfHost}/eng/query/validate`, pfParamString)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.error(error)
    })
  return result === "VALID"
}

export const generateSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = ""
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`
  }
  console.log(getString)

  return crypto.createHash("md5").update(getString).digest("hex")
}
