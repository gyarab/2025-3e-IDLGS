//analyze avg length of words and sentences TODO
//when saving articles

//analyze amount of images TODO

/*

TODO

	\begin{samepage}
		Učebnice vypíše varování nad danou větou pouze v následujících případech:
		
		\begin{itemize}
		\item Průměrná délka slov v dané větě je nížší než 80\% průměrné délky slov.
		\item Průměrná délka slov v dané větě je vyšší než 200\% průměrné délky slov.
		\item Délka věty je nižší než 70\% průměrné délky věty.
		\item Délka věty je vyšší než 150\% průměrné délky věty.
		\end{itemize}
	
		Je-li věta kratší než 4 slova, není varování vypsáno. Takové krátké věty se považují za stylistický výběr, nikoliv přílišné snížení úrovně. Stejně tak tomu je, je-li průměrná délka slov ve větě menší než 2.
	\end{samepage}
	
	Průměrná délka vět v anglojazyčném textovém korpusu činí 24,88 slov \cite{LengthOfSentence}. Průměrná délka slova v anglickém jazyce činila v roce 2012 4,25 písmen, v ruském jazyce zase 5,85 písmen. \cite{LengthOfWord}.
	
	Průměrná délka slova, která je při výpočtech použita, závisí na vybraném jazyce uživatele. Je-li vybrán jazyk slovanský - polština, čeština či ruština - použije se průměr pro ruštinu. Je-li vybrán jakýkoliv jiný jazyk - v učebnici pouze němčina či angličtina - použije se průměr pro angličtinu.
	
	\filbreak

*/

/*

TODO

	\subsection{Možnosti hostování programu}
	Program obsahuje 2 možnosti, jakým způsobem učebnici nastavit. Existuje možnost buď standardního režimu, kde instance obsahuje jednu či více učebnic, které je možné všechny navšívit z knihovny. Existuje také možnost režimu jedné učebnice, který zveřeňuje pouze jednu učebnici v databázi (a není-li žádná nastavena, sám ji tvoří).

*/

//TODO analyze percentage length of sections in article
//TODO find duplicates in article titles

export const analyzeSentenceLength = (text: string) => {};

export const analyzeWordLength = (text: string) => {};

export const analyzeMediaCount = (text: string) => {};

export const analyzeSectionLength = (text: string) => {};

export const analyzeDuplicateTitles = (text: string) => {};
