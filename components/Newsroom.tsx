import Image from "next/image";
import edition from "@/content/stories.json";

export default function Newsroom() {
  return <section id="latest" className="newsroom">
    <div className="newsroom-heading"><h2>GatorBait <span>reporting</span></h2><p>October 4, 2026 edition</p></div>
    <div className="story-grid">
      {edition.stories.map((story, i) => <article key={story.url} className={i === 0 ? "news-story lead-story" : "news-story"}>
        <a href={story.url} className="story-photo" data-cursor="READ" aria-label={story.title}>
          {story.image && <Image src={story.image} alt="" width={1000} height={625} unoptimized loading={i === 0 ? "eager" : "lazy"} />}
        </a>
        {story.credit && <p className="photo-credit">{story.credit}</p>}
        <div className="story-copy">
          <time dateTime={story.date}>{story.dateLabel}</time>
          <h3><a href={story.url} data-cursor="READ">{story.title}</a></h3>
          <p className="story-excerpt">{story.excerpt}</p>
          <div className="story-byline"><strong>{story.author}</strong><a href="https://www.gatorbaitmedia.com/">gatorbaitmedia.com</a></div>
          <a className="read-link" href={story.url}>Read the full story</a>
        </div>
      </article>)}
    </div>
    <a className="edition-button" href="https://www.gatorbaitmedia.com/gatorbait-media-blogs">All GatorBait stories</a>
  </section>;
}
