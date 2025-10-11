$zipPath = "C:\Users\minhq\Downloads\hospitality-vocabulary-interactive (1).zip"
$tempDir = "C:\Users\minhq\Downloads\temp_check"

# Extract
Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force

# List structure
Get-ChildItem $tempDir -Recurse -File -Filter "*.html" | Select-Object -First 5 FullName

# Cleanup
Remove-Item $tempDir -Recurse -Force

