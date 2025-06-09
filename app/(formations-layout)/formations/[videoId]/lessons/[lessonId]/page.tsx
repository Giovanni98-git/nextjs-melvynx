import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VIDEOS } from "@/app(formations-layout)/formations/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
  const videos = VIDEOS
 
  return videos.flatMap((video) => {
    const params  = video.lessons.map((lesson) => ({
      videoId: video.id,
      lessonId: lesson.id,
    }))
    return params;
  })
}

type PageProps = {
  params: Promise<{ videoId: string,  lessonId: string }>;
}

export const generateMetadata = async (props: PageProps) : Promise<Metadata> => {
  const params = await props.params;
    
    const video = VIDEOS.find((video) => video.id === params.videoId);

    if(!video) {
      notFound();
    }

     const lesson = video.lessons.find(lesson => lesson.id = params.lessonId)

    if(!lesson) {
      notFound();
    }
    
    return {
        title: `${video?.title} : ${lesson?.title}`,
    }
}


export default async function Page(props: PageProps) {
    const params = await props.params;
    
    const video = VIDEOS.find((video) => video.id === params.videoId);

    await new Promise((resolve) => setTimeout(resolve, 5000))

    if(!video) return notFound();

    const lesson = video.lessons.find(lesson => lesson.id = params.lessonId)

    if(!lesson) {
      notFound();
    }

  return (
      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
        <CardFooter> <Link href={`/formations/${video.id}`}>Back</Link></CardFooter>
      </Card>
  );
}
