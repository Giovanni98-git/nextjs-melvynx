import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/layout";
import { VIDEOS } from "../data";
import Link from "next/link";

// Server component
export default async function Page(props: { params: Promise<{videoId: string}>}) {
    const params = await props.params;
    
    const video = VIDEOS.find((video) => video.id === params.videoId);

    if(!video) return new Response(null, {status: 404})

  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <ul className="list-disc list-inside">
                {video?.lessons.map((lesson) => (
                    <li key={lesson.id}>
                        {lesson.title}</li>
                ))}
            </ul>
        </CardContent>
        <Link href="/formations"></Link>
      </Card>
    </PageLayout>
  );
}
