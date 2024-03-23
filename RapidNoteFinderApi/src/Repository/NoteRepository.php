<?php

namespace App\Repository;

use App\Entity\Note;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;

/**
 * @extends ServiceEntityRepository<Note>
 *
 * @method Note|null find($id, $lockMode = null, $lockVersion = null)
 * @method Note|null findOneBy(array $criteria, array $orderBy = null)
 * @method Note[]    findAll()
 * @method Note[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Note::class);
    }

    public function addNote(string $description, string $content, string $associate) : Note
    {
        if(empty($description) || empty($content) || empty($associate))
        {
            throw new \Exception('Description, content or associate cannot be empty', Response::HTTP_BAD_REQUEST);
        }
        $note = new Note();
        $note->setDescription($description)
            ->setContent($content)
            ->setAssociate($associate)
            ->setCreatedAt(new \DateTimeImmutable());

        $this->getEntityManager()->persist($note);
        $this->getEntityManager()->flush();

        return $note;
    }

    public function findNoteByDescription(string $description) : Note
    {
        return $this->createQueryBuilder('n')
            ->where("n.description like :val")
            ->setParameter('val', '%' . $description . '%')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

//    /**
//     * @return Note[] Returns an array of Note objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Note
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
