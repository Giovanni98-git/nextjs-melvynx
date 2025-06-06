import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/layout";
import Link from "next/link";
import { VIDEOS } from "./data";

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Plan de formations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            { VIDEOS.map((video) => (
                <Link
            href={`/formations/${video.id}`}
            key={video.id}
            className="text-indigo-500 underline"
          >
            {video.title}
          </Link>
            ))}
          
          
        </CardContent>
      </Card>
    </PageLayout>
  );
}
