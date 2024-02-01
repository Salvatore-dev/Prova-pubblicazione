import React from "react";
import '@/app/ui/css/footer_projects.css'


type ContentFooterProjects = {
    details: string[],
    tecnics: {
        fontEnd?: string[],
        backEnd?: string[]
    },
    greetings?: [{
        description: string,
        link: string,
        text_link: string
    }],
    notes?: [{
        description: string,
        text: string
    }]
}
const content_footer: ContentFooterProjects = {
    details: [''],
    tecnics: {
        fontEnd: [''],
        backEnd: ['']
    },
    greetings: [
        {
            description: '',
            link: '',
            text_link: ''
        }
    ],
    notes: [
        {
            description: '',
            text: ''
        }
    ]
}
const FooterDefault = ({ content }: { content: ContentFooterProjects }) => {


    return (
        <section className="footer w-screen md:w-full mt-5">
            <div className="general-informations">
                <div className="details-footer">
                    <p>Dettagli: </p>{" "}
                    {content && content.details.map((el, i) => (
                        <span key={"details-" + i}>{el}</span>
                    ))}
                </div>
                <div className="details-footer">
                    <p>Osservazzioni tecniche: </p>
                    <div className=" pl-4">
                        {content.tecnics.fontEnd && (
                            <>
                                <p>Front-end: </p>
                                {content.tecnics.fontEnd?.map((el, i) => (
                                    <span key={"front-" + i}>{el}</span>
                                ))}
                            </>

                        )}
                        {content.tecnics.backEnd && (
                            <>
                                <p>Front-end: </p>
                                {content.tecnics.backEnd && content.tecnics.backEnd?.map((el, i) => (
                                    <span key={"back-" + i}>{el}</span>
                                ))}
                            </>
                        )}
                    </div>

                </div>
                <div className="details-footer mandatory-citations">
                    <p>{content.greetings && 'Ringraziamenti: '}</p>
                    {
                        content.greetings?.map((el, i) => (
                            <span className=" text-justify" key={el.description}>
                                {el.description}
                                <a href={el.link} target="_black">{el.text_link}.</a>
                            </span>
                        ))
                    }
                </div>
                <div className="details-footer">
                    <p>{content.notes && 'Annotazioni:'}</p>
                    {content.notes?.map((el, i) => (
                        <div key={el.description} className="details-footer">
                            <p>{el.description}</p>
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FooterDefault;
