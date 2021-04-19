import { Card } from "react-bootstrap";
import useWindowSize from "../hooks/screenSize";
import Carousel from "./carousel";

const Home = () => {
    
    const { width } = useWindowSize();

    const importImages = () => [1,2,3,4,5,6].map(index => require(`../images/carousel_${index}${width>900?'.2':''}.jpg`).default);

    const cards = [
        { 
            title: 'ויטמין E', 
            txt: 'תפקודי הריאות של אנשים שבדמם רמות גבוהות של ויטמין E טובים יותר', 
            img: require('../images/card_1.jpeg').default
        }, { 
            title: 'ויטמין E', 
            txt: 'נטילת ויטמין E בתום פעילות גופנית מפחיתה כאבי שרירים', 
            img: require('../images/card_2.jpeg').default
        }, { 
            title: 'ויטמין C', 
            txt: 'נטילת ויטמין C עשויה להקל על ההתמודדות עם לחץ נפשי', 
            img: require('../images/card_3.jpeg').default
        }, { 
            title: 'ויטמין E', 
            txt: 'ויטמין E מפחית בעיות זיכרון ולמידה עקב הזדקנות', 
            img: require('../images/card_4.jpeg').default
        }
    ];

    return(
        <>
        <div className="top-space" style={{height: '75px'}}></div>
        <Carousel images={importImages()} />
        <main className="px-3 px-md-4 mx-auto" style={{maxWidth: '900px'}}> 
        <h1 className="text-center mt-5 text-info">כמה מילים.</h1>
            <p className="text-justify pb-2" style={{whiteSpace: 'pre-wrap', direction: 'rtl', columnCount: width > 700 ? 2 : 1}}>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק. <br/>

                הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק. <br/>

                ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס. <br/>

                צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. לורם איפסום דולור סיט אמט, קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי. <br/>

                קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת.
            </p>
        </main>
        <section className="pb-5 px-3 px-md-4">
            <h1 className="text-center mt-5 mb-3 text-info">הידעת?</h1>
            <div className="row">
                {cards.map(card => (
                <div key={card.txt} className="p-1 col-12 col-sm-6 col-md-3">
                    <Card className="shadow mx-auto" style={{maxWidth: '300px'}}>
                        <Card.Img variant="top" src={card.img} style={{height: '150px'}}/>
                        <Card.Body style={{height: '150px', overflowY: 'auto', backgroundColor: '#ccc'}}>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.txt}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                ))}
            </div>
        </section>
        <div className="bottom-space" style={{height: '100px'}}></div>
        </>
    );
}

export default Home;