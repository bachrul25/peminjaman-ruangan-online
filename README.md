# peminjaman-ruangan-online
Project akhir fullstack web developer - peminjaman ruangan secara online

## Rules untuk pengerjaan
### A. Clone Repository
1. Buka terminal atau gitbash
2. Ketik `git clone https://github.com/bachrul25/peminjaman-ruangan-online.git`

### B. Switch Branch
1. Buka folder peminjaman-ruangan-online menggunakan VSCode
2. Buka terminal VSCode
3. Ketik `git checkout nama-branch`
4. nama-branch diisi dengan branch masing-masing

### C. New Branch
1. Buka terminal VSCode
2. Ketik `git branch nama-branch-baru`

### D. Commit
1. Buka terminal VSCode
2. Ketik `git add .` untuk menyimpan semua perubahan atau `git add nama-folder-atau-nama-file` untuk menyimpan folder atau file tertentu saja
3. Ketik `git commit -m 'isi detail perubahan'`
4. Ketik `git push -u origin nama-branch`
5. nama-branch diisi branch yang saat ini aktif

### E. Pull From Master
1. Buka terminal VSCode
2. Switch ke branch masing-masing
3. Ketik `git pull origin Master` untuk mengambil pembaruan dari branch Master ke branch masing-masing

### F. Merge
1. Buka terminal VSCode
2. Switch ke branch Master
3. Ketik `git merge nama-branch` untuk menggabungkan perubahan dari branch tertentu
4. nama-branch diisi branch yang ingin digabungkan
5. Setelah itu, ketik `git push -u origin Master`

### G. Simple Way to Commit
1. Tekan icon `git` yang ada di VSCode (biasanya ada dibawah icon `search`)
2. Masukkan pesan perubahannya atau bisa menggunakan extension GitHub Copilot untuk auto-generate pesan commit
3. Tekan tombol `Commit` dan tombol `Sync` setelah commit