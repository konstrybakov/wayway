import { auth } from '@clerk/nextjs/server'

interface PracticeSessionResultsProps {
  params: {
    sessionId: string
  }
}

export default async function PracticeSessionResults({
  params: { sessionId },
}: PracticeSessionResultsProps) {
  auth().protect()

  return <div>Results for session {sessionId}</div>
}
