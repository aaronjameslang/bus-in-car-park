default: index.html specification.html

index.html: ../README.md
	pandoc ../README.md --standalone -o index.html

specification.html: specification.md
	pandoc specification.md --standalone -o specification.html
