import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

def prevision(dados):

    df = pd.read_csv('FinalDataset.csv')

    X = df.drop('warningZone', axis=1)
    y = df['warningZone']


    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    modelo = LogisticRegression()

    modelo.fit(X_train, y_train)

    previsoes = modelo.predict(dados)

    return previsoes