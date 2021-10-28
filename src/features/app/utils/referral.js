import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useReferral = () => {
  const router   = useRouter()
  const referral = router?.query?.ref

  useEffect(() => {
    // Prevent overriding the referral if it already exists
    if (!referral || localStorage.getItem('referral')) return

    localStorage.setItem('referral', referral)
  }, [ referral ])
}
