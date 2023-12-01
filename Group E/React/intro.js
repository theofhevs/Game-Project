import React from 'react';
import Header from './Header';
import Footer from './Footer';


const intro = () => {
    return (
        <div>
            <Header />
            <main>
                <section id="articles">
                    <article>
                        <header>
                            <h2>Mockup of our game project</h2>
                            <p>By Thomas Biselx the 29/10/2023 at 13:30</p>
                        </header>
                        <p>
                            All visual elements are subject to change. This is only a mockup to present the different elements and features of the game :
                        </p>
                        <br />
                        <p>Main menu</p>
                        <img class="mockupImage" src="ressources/images/gameMenu.png" alt="Mockup menu of our game" />
                        <p>Example of a level</p>
                        <img class="mockupImage" src="ressources/images/levelMockup.png" alt="Mockup level of our game" />
                        <p>Final Boss</p>
                        <img class="mockupImage" src="ressources/images/bossMockup.png" alt="Mockup boss of our game" />
                    </article>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default intro;