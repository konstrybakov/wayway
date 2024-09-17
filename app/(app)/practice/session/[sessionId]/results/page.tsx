interface PracticeSessionResultsProps {
  params: {
    sessionId: string
  }
}

export default async function PracticeSessionResults({
  params: { sessionId },
}: PracticeSessionResultsProps) {
  return <div>Results for session {sessionId}</div>
}
