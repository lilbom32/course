$zipPath = "C:\Users\minhq\Downloads\hospitality-vocabulary-interactive (1).zip"
$tempDir = "C:\Users\minhq\Downloads\temp_restore"
$targetDir = "C:\Users\minhq\Downloads\hospitality-vocabulary-interactive"

# Extract zip
Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force

# Copy HTML files (they're in zip root, not nested folder)
Copy-Item "$tempDir\*.html" -Destination $targetDir -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host "Restored all HTML files from backup zip"

