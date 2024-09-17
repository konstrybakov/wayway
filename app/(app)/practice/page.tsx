import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ActivityIcon,
  CheckCircleIcon,
  PlusIcon,
  RotateCcwIcon,
  Rows4Icon,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import { auth } from '../../(auth)/auth'
import { StartPractice } from './_components/start-practice-session'
import { getCounts } from './_utils/get-counts'

export default async function PracticePage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  const {
    totalCount,
    newCount,
    learningCount,
    learningDueForReviewCount,
    masteredCount,
    masteredDueForReviewCount,
  } = await getCounts(userId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Word Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Words
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{totalCount}</p>
              <Rows4Icon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Words
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{newCount}</p>
              <PlusIcon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Learning Progress</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Words in Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{learningCount}</p>
              <ActivityIcon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Due for review
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{learningDueForReviewCount}</p>
              <RotateCcwIcon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 self-start">
        <CardHeader>
          <CardTitle className="text-lg">Mastered Words</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Learned Words
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{masteredCount}</p>
              <CheckCircleIcon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Due for review
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">{masteredDueForReviewCount}</p>
              <RotateCcwIcon size={20} className="text-gray-500" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <StartPractice userId={userId} />
    </div>
  )
}
