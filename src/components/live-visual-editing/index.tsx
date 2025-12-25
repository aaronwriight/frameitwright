// TypeScript
'use client'

import { useLiveMode } from '@sanity/react-loader'
import { useEffect } from 'react'
import { client } from '@/sanity/lib/client'

const stegaClient = client.withConfig({ stega: true })

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient })

  useEffect(() => {
    let cancelled = false

    // dynamic import avoids static-analysis errors during build
    ;(async () => {
      try {
        const mod = await import('@sanity/visual-editing')
        // new versions expose enableVisualEditing (or similar). call if available.
        const enable = mod.enableVisualEditing ?? mod.default ?? null
        if (enable && !cancelled) {
          // many versions accept an options object; pass the client if supported.
          try {
            enable({ client: stegaClient })
          } catch {
            // fallback: try calling without args
            try { enable() } catch { /* ignore */ }
          }
        }
      } catch {
        // If import fails, visual editing simply won't be enabled
      }
    })()

    // keep previous behavior for draft-mode redirect
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && typeof window !== 'undefined' && window === parent) {
      location.href = '/api/disable-draft'
    }

    return () => {
      cancelled = true
    }
  }, [])

  // no JSX UI here; visual editing is enabled by the runtime call above
  return null
}

// // ./components/LiveVisualEditing.tsx

// 'use client'

// import { useLiveMode } from '@sanity/react-loader'
// import { VisualEditing } from 'next-sanity'
// import { VisualEditing } from '@sanity/visual-editing'
// import { useEffect } from 'react'

// import { client } from '@/sanity/lib/client'

// // Always enable stega in Live Mode
// const stegaClient = client.withConfig({ stega: true })

// export default function LiveVisualEditing() {
//   useLiveMode({ client: stegaClient })
//   useEffect(() => {
//     // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
//     if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent) {
//       location.href = '/api/disable-draft'
//     }
//   }, [])

//   return <VisualEditing />
// }
