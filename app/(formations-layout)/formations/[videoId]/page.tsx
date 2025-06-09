import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VIDEOS } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const videos = VIDEOS
 
  return videos.map((video) => ({
    videoId: video.id,
  }))
}

type PageProps = {
  params: Promise<{ videoId: string }>;
}

export const generateMetadata = async (props: PageProps) : Promise<Metadata> => {
  const params = await props.params;
    
    const video = VIDEOS.find((video) => video.id === params.videoId);
    
    return {
        title: `Video ${video?.title}`
    }
}

export default async function Page( props: PageProps ) {
    
const params = await props.params;
    
    const video = VIDEOS.find((video) => video.id === params.videoId);
    if(!video) notFound();

  return (
      <Card>
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <ul className="list-disc list-inside">
                {video?.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link href={`/formations/${video.id}/lessons/${lesson.id}`}>
                      {lesson.title}
                      </Link>
                        </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter> <Link href="/formations">Back</Link></CardFooter>
      </Card>
  );
}
