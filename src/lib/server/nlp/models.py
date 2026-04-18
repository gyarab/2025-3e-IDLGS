#https://stanfordnlp.github.io/stanza/

import stanza

en = stanza.Pipeline('en')
cs = stanza.Pipeline('cs')
pl = stanza.Pipeline('pl')


EN_TEMPLATES = {

}

PL_TEMPLATES = {

}
CS_TEMPLATES = {

}

#https://universaldependencies.org/u/dep/index.html
def extractAnswers(model: stanza.Pipeline, question: str):
	answers = []

	doc = model(question)
	for sentence in doc.sentences:
		for word in sentence.words:
			if word.deprel == 'nsubj' or word.deprel == 'obj' or word.deprel == 'obl' or word.deprel == 'iobj' or word.deprel == 'nmod' or word.deprel == 'appos' or word.deprel == 'vocative':
				answers.append((word.text, word.deprel))
	return answers

#print(extractAnswers(en, """Where is my home, where is my home,
#Streams are rushing through the meadows,
#Midst the rocks sigh fragrant pine groves,
#Orchards decked in spring's array,
#Scenes of Paradise portray.
#And this land of wondrous beauty,
#𝄆 Is the Czech land, home of mine! 𝄇
#			   
#	I
#Poland has not yet succumbed.
#As long as we remain,
#What the foe by force has seized,
#Sword in hand we'll gain.
#
#Chorus:
#𝄆 March! March, Dabrowski!
#March from Italy to Poland!
#Under your command
#We shall reach our land. 𝄇
#			   """))
#print(extractAnswers(pl, """I
#Jeszcze Polska nie zginęła,
#Kiedy my żyjemy.
#Co nam obca przemoc wzięła,
#Szablą odbierzemy.
#
#Refren:
#𝄆 Marsz, marsz, Dąbrowski,
#Z ziemi włoskiej do Polski.
#Za twoim przewodem
#Złączym się z narodem. 𝄇
#
#II
#Przejdziem Wisłę, przejdziem Wartę,
#Będziem Polakami.
#Dał nam przykład Bonaparte,
#Jak zwyciężać mamy.
#"""))
print(extractAnswers(cs, """Kde domov můj, kde domov můj,
voda hučí po lučinách,
bory šumí po skalinách,
v sadě skví se jara květ,
zemský ráj to na pohled!
A to je ta krásná země,
𝄆 země česká domov můj! 𝄇
"""))