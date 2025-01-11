import ManifestPage from '@/components/ManifestPage'

export default function Manifest({ params }: { params: { id: string } }) {
  return <ManifestPage id={params.id} />
}

