import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

conn = psycopg2.connect(database="Feast",
                        host="ep-sweet-darkness-58939442.il-central-1.aws.neon.tech",
                        port="5432",
                        user="Alisohani",
                        password="yNMT6Hh7bqlR",
                        sslmode="require")
