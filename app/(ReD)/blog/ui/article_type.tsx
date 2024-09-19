import React from 'react'
import style from '@/app/(ReD)/blog/ui/article.module.css'

// aside si pone al fianco del p successivo
function Article_type_tag_esempi() {
    return (
        <article className='w-[90%] m-auto'>
            <h1>Modello html articolo</h1>
            <div className=' bg-neutral-200'>
                <p>Per un aside all'interno di una articolo:</p>
                <p>
                    Salamanders are a group of amphibians with a lizard-like appearance, including short legs and a tail in both larval
                    and adult forms.
                </p>

                <aside className={style.aside_article}>
                    <p>The Rough-skinned Newt defends itself with a deadly neurotoxin.</p>
                </aside>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad totam id minima soluta amet cupiditate odio ullam beatae ex, a officiis maiores autem explicabo. Autem, natus perferendis! Magni, voluptatem corporis?
                </p>
                <p>
                    Several species of salamander inhabit the temperate rainforest of the Pacific Northwest, including the Ensatina, the
                    Northwestern Salamander and the Rough-skinned Newt. Most salamanders are nocturnal, and hunt for insects, worms and
                    other small creatures.
                </p>
            </div>
            <div className={style.article_blockquote}>
                <p>Per una citazione, rivedere lo style</p>
                <blockquote cite="https://datatracker.ietf.org/doc/html/rfc1149">
                    <p className=''>
                        Avian carriers can provide high delay, low throughput, and low altitude
                        service. The connection topology is limited to a single point-to-point path
                        for each carrier, used with standard carriers, but many carriers can be used
                        without significant interference with each other, outside early spring. This
                        is because of the 3D ether space available to the carriers, in contrast to
                        the 1D ether used by IEEE802.3. The carriers have an intrinsic collision
                        avoidance system, which increases availability.
                        <sup>1</sup>
                    </p>
                </blockquote>
            </div>
            <div className=' bg-neutral-200'>
                <p>Per richiamare sotto la citazione. rivedere  lo Styled</p>
                <figure>
                    <blockquote>
                        <p>It was a bright cold day in April, and the clocks were striking thirteen. <sup>2</sup></p>
                    </blockquote>
                    <figcaption>
                        <sup>2</sup>First sentence in <cite><a href="http://www.george-orwell.org/1984/0.html">Nineteen Eighty-Four</a></cite> by George
                        Orwell (Part 1, Chapter 1).
                    </figcaption>
                </figure>
            </div>
            <div className=' bg-neutral-200'>
                <p>
                    Per date pubblicazione o ultima modifica articolo: Posted on
                    <time dateTime="2015-05-15 19:00">15 maggio 2015</time>
                    by Staff.
                </p>
            </div>
            <div className=' bg-neutral-200'>
                <p>Per le abbreviazioni</p>
                <p className={style.article_abbr}>
                    You can use <abbr title='Cascading Style Sheets'>CSS</abbr> to style your <abbr>HTML</abbr> (HyperText Markup Language).
                    Using style sheets, you can keep your <abbr>CSS</abbr> presentation layer and <abbr>HTML</abbr> content layer
                    separate. This is called "separation of concerns."
                </p>
            </div>
            <div className=' bg-neutral-200'>
                <p>per un glossario</p>
                <dl>
                    <dt>Firefox</dt>
                    <dd>
                        A free, open source, cross-platform, graphical web browser developed by the
                        Mozilla Corporation and hundreds of volunteers.
                    </dd>
                    <dt>Chrome</dt>
                    <dd>
                        A free, open source, cross-platform, graphical web browser developed by Google.
                    </dd>

                </dl>
            </div>
        </article>
    )
}

export default Article_type_tag_esempi