import os
import pandas as pd

file_path = 'mutfak/csvtoxlsx/revirgecici1.xlsx'
output_csv = 'mutfak/csvtoxlsx/revirgecici1.csv'

try:
    # Excel dosyasındaki tüm sayfaları oku
    xls = pd.ExcelFile(file_path)
    dfs = []

    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        df['SheetName'] = sheet_name  # Sayfa adını ekle
        dfs.append(df)

    # Tüm sayfaları birleştir
    combined_df = pd.concat(dfs)

    # Birleştirilmiş veriyi CSV dosyasına yaz
    combined_df.to_csv(output_csv, index=False)
    print(f"Tüm sayfalar '{output_csv}' dosyasına başarıyla birleştirildi.")
except Exception as e:
    print(f"Error reading file '{file_path}': {str(e)}")